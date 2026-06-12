#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
#define BUFFER_SIZE 2
#define ITEMS_TO_PRODUCE 6
int buffer[BUFFER_SIZE];
int in = 0;
int out = 0;
HANDLE empty;
HANDLE full;
HANDLE mutex;
DWORD WINAPI producer(LPVOID arg)
{
int item;
for(int i = 1; i <= ITEMS_TO_PRODUCE; i++)
{
item = i;
WaitForSingleObject(empty, INFINITE);
WaitForSingleObject(mutex, INFINITE);
buffer[in] = item;
printf("Producer produced item %d at position %d\n",
item, in);
in = (in + 1) % BUFFER_SIZE;

ReleaseMutex(mutex);
ReleaseSemaphore(full, 1, NULL);
Sleep(1000);
}
return 0;
}
DWORD WINAPI consumer(LPVOID arg)
{
int item;
for(int i = 1; i <= ITEMS_TO_PRODUCE; i++)
{
WaitForSingleObject(full, INFINITE);
WaitForSingleObject(mutex, INFINITE);
item = buffer[out];
printf("Consumer consumed item %d from position %d\n",
item, out);
out = (out + 1) % BUFFER_SIZE;
ReleaseMutex(mutex);
ReleaseSemaphore(empty, 1, NULL);
Sleep(2000);
}
return 0;
}
int main()
{

HANDLE producerThread;
HANDLE consumerThread;
empty = CreateSemaphore(NULL, BUFFER_SIZE, BUFFER_SIZE, NULL);
full = CreateSemaphore(NULL, 0, BUFFER_SIZE, NULL);
mutex = CreateMutex(NULL, FALSE, NULL);
producerThread = CreateThread(NULL, 0, producer, NULL, 0, NULL);
consumerThread = CreateThread(NULL, 0, consumer, NULL, 0, NULL);
WaitForSingleObject(producerThread, INFINITE);
WaitForSingleObject(consumerThread, INFINITE);
CloseHandle(producerThread);
CloseHandle(consumerThread);
CloseHandle(empty);
CloseHandle(full);
CloseHandle(mutex);
printf("\nExecution completed successfully.\n");
return 0;
}
