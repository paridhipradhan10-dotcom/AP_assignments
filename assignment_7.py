from typing import List, Dict, Set
from collections import defaultdict
from functools import reduce

def total_time_per_user(logs: List[Dict]) -> Dict[str, float]:
totals = defaultdict(float)
reduce(
lambda _, log: totals.__setitem__(
log["user"], totals[log["user"]] + log["duration"]
),
logs,
None
)
return dict(totals)
def most_active_users(logs: List[Dict], k: int) -> List[str]:
totals = total_time_per_user(logs)
sorted_users = sorted(
totals.items(),
key=lambda x: x[1],
reverse=True
)
return [user for user, _ in sorted_users[:k]]
def unique_actions(logs: List[Dict]) -> Set[str]:
return {log["action"] for log in logs}

logs = [
{"user": "CS101", "action": "YouTube", "duration": 30},
{"user": "CS102", "action": "Instagram", "duration": 20},
{"user": "CS101", "action": "Google", "duration": 15},
{"user": "CS103", "action": "YouTube", "duration": 40},
{"user": "CS102", "action": "Facebook", "duration": 10}
]
k = 2

totals = total_time_per_user(logs)
top_users = most_active_users(logs, k)
actions = unique_actions(logs)

print("Total time per user:", totals)
print("Top", k, "most active users:", top_users)
print("Unique actions:", actions)

print("\nComplexity Analysis:")
print("For log generation - O(n)")
print("Total time calculation - O(n)")
print("Sorting for top K - O(mlogm)")
print("Unique action fetching - O(n)")
print("n and m being the number of logs and number of users
respectively.")
print("Space: O(n) [Log storage]")
