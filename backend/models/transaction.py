"""Transaction model for MySQL CRUD operations."""

from __future__ import annotations

import logging
from dataclasses import dataclass, asdict
from decimal import Decimal
from typing import Any

from mysql.connector import Error

try:
    from ..database import DatabaseConnectionError, connection_cursor
except ImportError:  # pragma: no cover
    from database import DatabaseConnectionError, connection_cursor

logger = logging.getLogger(__name__)


@dataclass(slots=True)
class Transaction:
    transaction_id: int | None = None
    account_id: int | None = None
    transaction_type: str | None = None
    amount: float | None = None
    transaction_date: str | None = None

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)

    @classmethod
    def create(cls, data: dict[str, Any]) -> dict[str, Any]:
        """Create a new transaction and update the account balance."""
        with connection_cursor(dictionary=True) as (connection, cursor):
            try:
                # Start transaction
                connection.start_transaction()

                # 1. Insert Transaction
                query = """
                    INSERT INTO `Transactions` (account_id, transaction_type, amount, transaction_date)
                    VALUES (%s, %s, %s, NOW())
                """
                cursor.execute(
                    query,
                    (
                        data["account_id"],
                        data["transaction_type"],
                        data["amount"],
                    ),
                )
                transaction_id = cursor.lastrowid

                # 2. Update Account Balance
                # Note: This is a simplified version. In a real app, you'd handle different types.
                # Here we assume 'deposit' adds and others (withdrawal, transfer, wire) subtract.
                if data["transaction_type"].lower() == "deposit":
                    balance_query = "UPDATE `Accounts` SET balance = balance + %s WHERE account_id = %s"
                else:
                    balance_query = "UPDATE `Accounts` SET balance = balance - %s WHERE account_id = %s"

                cursor.execute(balance_query, (data["amount"], data["account_id"]))

                if cursor.rowcount == 0:
                    connection.rollback()
                    raise ValueError(f"Account with ID {data['account_id']} not found")

                connection.commit()

                return {
                    "transaction_id": transaction_id,
                    "account_id": data["account_id"],
                    "transaction_type": data["transaction_type"],
                    "amount": data["amount"],
                }
            except Exception as exc:
                connection.rollback()
                logger.exception("Error creating transaction")
                raise exc

    @classmethod
    def list_all(cls, limit: int = 100) -> list[dict[str, Any]]:
        """List all transactions."""
        with connection_cursor(dictionary=True) as (_connection, cursor):
            cursor.execute(
                "SELECT * FROM `Transactions` ORDER BY transaction_date DESC LIMIT %s",
                (limit,),
            )
            return cursor.fetchall()
