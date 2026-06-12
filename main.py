from score_processor import ScoreProcessor
sp = ScoreProcessor()
user_input = input("Enter a number (or text): ")
with open("temp.txt", "w") as f:
f.write(user_input)
try:
result = sp.process_score_file("temp.txt")
print("Final Result:", result)
except Exception:
print("Processing failed.")
