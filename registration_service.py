import re
class InvalidEmailError(ValueError):
def __init__(self, email: str):
super().__init__(f"Invalid email provided: '{email}'")
class UnderageError(ValueError):
def __init__(self, age: int):
super().__init__(f"User must be at least 18 years old. Provided
age: {age}")
class RegistrationService:
EMAIL_PATTERN = r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
def register_user(self, email: str, age: int) -> bool:
"""
Validates user email and age before registration.
:param email: User email
:param age: User age
:return: True if registration successful
:raises InvalidEmailError, UnderageError
"""
assert isinstance(age, int), "Age must be an integer"
if email is None or email.strip() == "":
raise InvalidEmailError(email)
if not re.match(self.EMAIL_PATTERN, email):
raise InvalidEmailError(email)
if age < 18:
raise UnderageError(age)
return True
