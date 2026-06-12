import pytest
from registration_service import (
RegistrationService,
InvalidEmailError,
UnderageError
)
@pytest.fixture
def service():
return RegistrationService()
def test_valid_registration(service):
assert service.register_user("test@example.com", 20) is True
def test_empty_email(service):
with pytest.raises(InvalidEmailError):
service.register_user("", 20)
def test_none_email(service):
with pytest.raises(InvalidEmailError):
service.register_user(None, 20)
def test_invalid_email_format(service):
with pytest.raises(InvalidEmailError):
service.register_user("invalid-email", 20)
def test_missing_domain(service):
with pytest.raises(InvalidEmailError):
service.register_user("user@", 20)
def test_underage_user(service):
with pytest.raises(UnderageError):
service.register_user("test@example.com", 17)
def test_boundary_age(service):
assert service.register_user("test@example.com", 18) is True
def test_invalid_age_type(service):
with pytest.raises(AssertionError):
service.register_user("test@example.com", "twenty")
