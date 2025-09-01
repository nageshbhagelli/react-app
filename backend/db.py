# For database / in-memory storage as of now.

from typing import Dict, List

# --- User DB --- #
user_db: Dict[str, Dict] = {}

def get_user_db():
    return user_db


# --- Orders DB --- #
orders_db: Dict[str, List[Order]] = {}
# key: username & value: list of orders


# --- Trades DB --- #
trades_db: Dict[str, List[Trade]] = {}
# key: username & value: list of trades