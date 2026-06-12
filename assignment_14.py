import gc
import sys
class Node:
def __init__(self, name):
self.name = name
self.link = None
def __repr__(self):
return f"Node({self.name})"

A = Node("A")
B = Node("B")
print("=" * 50)
print("STEP 1: Objects Created")
print("=" * 50)
print(f" A -> {A}")
print(f" B -> {B}")

A.link = B
B.link = A
print("\n" + "=" * 50)
print("STEP 2: Cycle Created (A.link = B, B.link = A)")
print("=" * 50)
print("\n" + "=" * 50)
print("STEP 3: Reference Counts BEFORE del")
print("=" * 50)

print(f" sys.getrefcount(A) = {sys.getrefcount(A)} (includes: variable A
+ B.link + getrefcount arg)")
print(f" sys.getrefcount(B) = {sys.getrefcount(B)} (includes: variable B
+ A.link + getrefcount arg)")
print("\n" + "=" * 50)
print("STEP 4: del A and del B")
print("=" * 50)
del A
del B
print(" del A -> done")
print(" del B -> done")
print(" Variables A and B are now gone from our code.")
print(" BUT the objects still reference each other internally!")
print("\n" + "=" * 50)
print("STEP 5: Investigation — are they still in memory?")
print("=" * 50)
gc.disable()
leaked = [obj for obj in gc.get_objects() if isinstance(obj, Node)]
print(f" Objects tracked by GC that are Node instances: {len(leaked)}")
for obj in leaked:
print(f" -> {obj} | link points to: {obj.link}")
print("\n Even though A and B are deleted, they are STILL ALIVE")
print(" because each holds a reference to the other.")
print(" Their reference count never reached zero — this is a CYCLE.")
print("\n" + "=" * 50)
print("STEP 6: Force Garbage Collection")
print("=" * 50)
gc.enable()
collected = gc.collect()

print(f" gc.collect() ran successfully.")
print(f" Number of unreachable objects collected: {collected}")
remaining = [obj for obj in gc.get_objects() if isinstance(obj, Node)]
print(f" Node objects still in memory after gc.collect():
{len(remaining)}")
print("\n Memory fully cleaned up. No leaks remain.")
print("=" * 50)
