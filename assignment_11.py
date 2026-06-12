from abc import ABC, abstractmethod
class LibraryItem(ABC):
_total_items = 0
def __init__(self, title, year=2024):
if not title or not title.strip():
raise ValueError("Title cannot be empty.")
if not isinstance(year, int) or year < 1000 or year > 2100:
raise ValueError(f"Invalid year: {year}")
self.title = title
self.year = year
LibraryItem._total_items += 1
@abstractmethod
def display_info(self):
pass
@classmethod
def get_total_items(cls):
return cls._total_items
def __str__(self):
return f"[{self.__class__.__name__}] {self.title} ({self.year})"

class Book(LibraryItem):
def __init__(self, title, author, year=2024, pages=0):
super().__init__(title, year)

if not author or not author.strip():
raise ValueError("Author cannot be empty.")
if pages < 0:
raise ValueError("Pages cannot be negative.")
self.author = author
self.pages = pages
def display_info(self):
print(" BOOK")
print(f" Title : {self.title}")
print(f" Author : {self.author}")
print(f" Year : {self.year}")
print(f" Pages : {self.pages if self.pages > 0 else 'N/A'}")
print("------------------------------------------")

class DVD(LibraryItem):
def __init__(self, title, duration, year=2024, genre="General"):
super().__init__(title, year)
if duration <= 0:
raise ValueError("Duration must be positive.")
self.duration = duration
self.genre = genre
def display_info(self):
print("------------------------------------------")
print(" DVD")
print(f" Title : {self.title}")
print(f" Genre : {self.genre}")
print(f" Year : {self.year}")
print(f" Duration : {self.duration} mins ({self.duration // 60}h
{self.duration % 60}m)")

def test_exception(scenario, action):
print(f" [TEST] {scenario} -> ", end="")
try:
action()
print("No exception thrown (unexpected!)")

except (ValueError, TypeError) as e:
print(f"Exception caught OK ({e})")
if __name__ == "__main__":
print(" LIBRARY SYSTEM DEMO ")
b1 = Book("The Alchemist", "Paulo Coelho", 1988, 208)
b2 = Book("Clean Code", "Robert C. Martin", pages=431)
b3 = Book("Atomic Habits", "James Clear", 2018)
d1 = DVD("Inception", 148, 2010, "Sci-Fi")
d2 = DVD("Nature Documentary", 90, 2022)
library = [b1, b2, b3, d1, d2]
print("==========================================")
print(" LIBRARY COLLECTION ")
for item in library:
item.display_info()
print()
print(" STATIC COUNTER DEMO ")
print(f" Total LibraryItems created :
{LibraryItem.get_total_items()}")
print()
print(" Quick list using __str__:")
for item in library:
print(f" {item}")
print()
print(" VALIDATION / ERROR HANDLING DEMO ")
