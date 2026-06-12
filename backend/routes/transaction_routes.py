"""Transaction routes for the Banking Management System API."""

from __future__ import annotations

import logging
from typing import Any

from flask import Blueprint, jsonify, request
from mysql.connector import Error

try:
    from ..database import DatabaseConnectionError
    from ..models.transaction import Transaction
except ImportError:  # pragma: no cover
    from database import DatabaseConnectionError
    from models.transaction import Transaction

transaction_bp = Blueprint("transactions", __name__, url_prefix="/api/transactions")
logger = logging.getLogger(__name__)


def _success(message: str, data: Any | None = None, status_code: int = 200):
    return jsonify({"success": True, "message": message, "data": data if data is not None else {}}), status_code


def _error(message: str, status_code: int):
    return jsonify({"success": False, "message": message}), status_code


@transaction_bp.get("")
def get_transactions():
    try:
        transactions = Transaction.list_all()
        return _success("Transactions retrieved successfully", transactions)
    except DatabaseConnectionError as exc:
        return _error(str(exc), 503)
    except Exception:
        logger.exception("Unexpected error while listing transactions")
        return _error("An unexpected error occurred while retrieving transactions", 500)


@transaction_bp.post("")
def create_transaction():
    try:
        payload = request.get_json(silent=True) or {}
        
        # Basic validation
        if not payload.get("account_id") or not payload.get("transaction_type") or payload.get("amount") is None:
            return _error("Missing required fields: account_id, transaction_type, amount", 400)
            
        try:
            amount = float(payload["amount"])
            if amount <= 0:
                return _error("Amount must be greater than zero", 400)
        except ValueError:
            return _error("Amount must be a number", 400)

        transaction = Transaction.create({
            "account_id": int(payload["account_id"]),
            "transaction_type": str(payload["transaction_type"]),
            "amount": amount
        })
        
        return _success("Transaction processed successfully", transaction, 201)
    except ValueError as exc:
        return _error(str(exc), 400)
    except DatabaseConnectionError as exc:
        return _error(str(exc), 503)
    except Exception:
        logger.exception("Unexpected error while creating transaction")
        return _error("An unexpected error occurred while processing the transaction", 500)
