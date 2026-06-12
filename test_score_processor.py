import pytest
from score_processor import ScoreProcessor

@pytest.fixture
def processor():
return ScoreProcessor()
def test_valid_file(tmp_path, processor):
file = tmp_path / "valid.txt"
file.write_text("5")
result = processor.process_score_file(str(file))
assert result == 50
def test_missing_file(processor):
with pytest.raises(FileNotFoundError):
processor.process_score_file("non_existent.txt")

def test_invalid_data(tmp_path, processor):
file = tmp_path / "invalid.txt"
file.write_text("abc")
with pytest.raises(ValueError):
processor.process_score_file(str(file))
