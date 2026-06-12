from abc import ABC, abstractmethod
from datetime import datetime

class PaymentProcessor(ABC):
    @abstractmethod
    def process_payment(self, amount: float) -> bool:
        pass


class NotificationSender(ABC):
    @abstractmethod
    def send_notification(self, message: str, recipient: str) -> None:
        pass


class OrderStorage(ABC):
    @abstractmethod
    def save_order(self, order: dict) -> None:
        pass

class CreditCardPayment(PaymentProcessor):
    def process_payment(self, amount: float) -> bool:
        print(f"Processing Credit Card payment of ₹{amount}")
        return True


class UPIPayment(PaymentProcessor):
    def process_payment(self, amount: float) -> bool:
        print(f"Processing UPI payment of ₹{amount}")
        return True


class WalletPayment(PaymentProcessor):
    def process_payment(self, amount: float) -> bool:
        print(f"Processing Wallet payment of ₹{amount}")
        return True

class EmailNotification(NotificationSender):
    def send_notification(self, message: str, recipient: str) -> None:
        print(f"[EMAIL] To: {recipient} | Message: {message}")


class SMSNotification(NotificationSender):
    def send_notification(self, message: str, recipient: str) -> None:
        print(f"[SMS] To: {recipient} | Message: {message}")


class PushNotification(NotificationSender):
    def send_notification(self, message: str, recipient: str) -> None:
        print(f"[PUSH] To: {recipient} | Message: {message}")
lass DatabaseStorage(OrderStorage):
    def save_order(self, order: dict) -> None:
        print(f"[DATABASE] Saving order: {order}")


class FileStorage(OrderStorage):
    def save_order(self, order: dict) -> None:
        print(f"[FILE] Writing order to file: {order}")

class Order(ABC):
    def __init__(self, order_id: str, customer: str, amount: float):
        self.order_id = order_id
        self.customer = customer
        self.amount = amount
        self.created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    @abstractmethod
    def get_final_amount(self) -> float:
        pass

    def to_dict(self) -> dict:
        return {
            "order_id": self.order_id,
            "customer": self.customer,
            "amount": self.amount,
            "final_amount": self.get_final_amount(),
            "type": self.__class__.__name__,
            "created_at": self.created_at
        }


class RegularOrder(Order):
    def get_final_amount(self) -> float:
        return self.amount


class DiscountedOrder(Order):
    def __init__(self, order_id: str, customer: str, amount: float, discount: float):
        super().__init__(order_id, customer, amount)
        self.discount = discount

    def get_final_amount(self) -> float:
        return self.amount - (self.amount * self.discount / 100)


class PriorityOrder(Order):
    PRIORITY_FEE = 50.0

    def get_final_amount(self) -> float:
        return self.amount + self.PRIORITY_FEE


class OrderService:
    def __init__(
        self,
        payment_processor: PaymentProcessor,
        notification_sender: NotificationSender,
        order_storage: OrderStorage
    ):
        self.payment_processor = payment_processor
        self.notification_sender = notification_sender
        self.order_storage = order_storage

    def process_order(self, order: Order, recipient: str) -> None:
        print(f"\n{'='*50}")
        print(f"Processing Order ID: {order.order_id}")
        print(f"Customer: {order.customer}")
        print(f"Order Type: {order.__class__.__name__}")
        print(f"Final Amount: ₹{order.get_final_amount()}")
        print(f"{'='*50}")

        payment_success = self.payment_processor.process_payment(order.get_final_amount())

        if payment_success:
            message = f"Order {order.order_id} confirmed! Amount paid: ₹{order.get_final_amount()}"
            self.notification_sender.send_notification(message, recipient)
            self.order_storage.save_order(order.to_dict())
            print(f"Order {order.order_id} processed successfully.\n")
        else:
            print(f"Payment failed for Order {order.order_id}.\n")


if __name__ == "__main__":

    # Regular Order — UPI — Email — Database
    service1 = OrderService(
        payment_processor=UPIPayment(),
        notification_sender=EmailNotification(),
        order_storage=DatabaseStorage()
    )
    order1 = RegularOrder("ORD001", "Alice", 500.0)
    service1.process_order(order1, "alice@email.com")

    # Discounted Order — Credit Card — SMS — File
    service2 = OrderService(
        payment_processor=CreditCardPayment(),
        notification_sender=SMSNotification(),
        order_storage=FileStorage()
    )
    order2 = DiscountedOrder("ORD002", "Bob", 1000.0, discount=20)
    service2.process_order(order2, "9876543210")

    # Priority Order — Wallet — Push — Database
    service3 = OrderService(
        payment_processor=WalletPayment(),
        notification_sender=PushNotification(),
        order_storage=DatabaseStorage()
    )
    order3 = PriorityOrder("ORD003", "Charlie", 750.0)
    service3.process_order(order3, "charlie_device_token")
