#include <stdio.h>
#include <windows.h>
#define NUM_THREADS 4
#define INCREMENTS 1000000
long counter = 0;
long safe_counter = 0;
HANDLE mutex;
DWORD WINAPI increment_without_mutex(LPVOID arg) {
for (int i = 0; i < INCREMENTS; i++) {
counter++;
}
return 0;
}
void run_without_mutex() {
HANDLE threads[NUM_THREADS];
counter = 0;
printf("============================================\n");
printf(" PART 1: No Synchronization (Race Condition)\n");
printf("============================================\n");
printf("Threads : %d\n", NUM_THREADS);
printf("Each thread increments: %d times\n", INCREMENTS);
printf("Expected counter value : %d\n", NUM_THREADS *
INCREMENTS);
for (int i = 0; i < NUM_THREADS; i++) {
threads[i] = CreateThread(NULL, 0, increment_without_mutex,

NULL, 0, NULL);

}
WaitForMultipleObjects(NUM_THREADS, threads, TRUE, INFINITE);
for (int i = 0; i < NUM_THREADS; i++) {
CloseHandle(threads[i]);
}
printf("Actual counter value : %ld <-- WRONG (race
condition)\n\n", counter);
}
DWORD WINAPI increment_with_mutex(LPVOID arg) {
for (int i = 0; i < INCREMENTS; i++) {
WaitForSingleObject(mutex, INFINITE);
safe_counter++;
ReleaseMutex(mutex);
}
return 0;
}
void run_with_mutex() {
HANDLE threads[NUM_THREADS];
safe_counter = 0;
mutex = CreateMutex(NULL, FALSE, NULL);
printf("============================================\n");
printf(" PART 2: With Mutex (Correct Output)\n");
printf("============================================\n");
printf("Threads : %d\n", NUM_THREADS);
printf("Each thread increments: %d times\n", INCREMENTS);
printf("Expected counter value : %d\n", NUM_THREADS *
INCREMENTS);
for (int i = 0; i < NUM_THREADS; i++) {
threads[i] = CreateThread(NULL, 0, increment_with_mutex,

NULL, 0, NULL);

}
WaitForMultipleObjects(NUM_THREADS, threads, TRUE, INFINITE);
for (int i = 0; i < NUM_THREADS; i++) {
CloseHandle(threads[i]);
}
CloseHandle(mutex);
printf("Actual counter value : %ld <-- CORRECT\n\n",
safe_counter);
}
int main(void) {
run_without_mutex();
run_with_mutex();
return 0;
}
