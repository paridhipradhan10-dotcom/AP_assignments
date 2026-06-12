class ScoreProcessor:
def process_score_file(self, file_path: str) -> int:
try:
with open(file_path, 'r') as file:
data = file.read().strip()

score = int(data)

result = score * 10
except FileNotFoundError:
print("Error: File not found.")
raise
except ValueError:
print("Error: Invalid data format. File must contain a
number.")
raise
else:
print("Data processed successfully")
return result
finally:
print("File cleanup completed")
