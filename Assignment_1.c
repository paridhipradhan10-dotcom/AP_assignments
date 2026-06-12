#include <stdio.h>
#include <time.h>

#define MAX 100000


int LinearSearch (int a[], int n, int key)
{
      for (int i = 0; i < n; i++) {
            if (a[i] == key)
                 return i;
}
return -1;
}

int BinarySearch(int a[], int n, int key)
{
    int low = 0, high = n-1, mid;
    while (low <= high){
        mid = (low + high) / 2;
        if (a[mid] == key)
            return mid;
        else if (a[mid] < key)
            low = mid + 1;
        else
            high = mid - 1;
    }
    return -1;
}

int BubbleSort(int a[], int n)
{
    int temp;
    for (int i = 0; i<n-1; i++)
    {
        for (int j = 0; j < n-i-1; j++) 
        {
            if (a[j] > a[j+1])
            {
                temp = a[j];
                a[j] = a[j+1];
                a[j+1] = temp;

            }
        }
    }
    return 0; 
}

int main() {
    int a[MAX];
    int n;
    clock_t start, end;
    double time_taken;

    printf("Input Size\tLinear\t\tBinary\t\tQuadratic\n");
    for (n = 1000; n<= 5000; n += 1000) {
        for (int i =0; i<n; i++)
          a[i] = i;

        start = clock();
        LinearSearch(a, n, -1);
        end = clock();
        time_taken = ((double)(end - start)) / CLOCKS_PER_SEC;
        printf("%d\t\t%f\t", n, time_taken);

        start = clock(); 
        BinarySearch(a, n, -1);
        end = clock();
        time_taken = ((double)(end - start)) / CLOCKS_PER_SEC;
        printf("\t%f", time_taken); 

        start = clock();
        BubbleSort(a, n);
        end = clock();
        time_taken = ((double) (end - start)) / CLOCKS_PER_SEC; 
        printf("\t%f\n", time_taken);
    }
    return 0;
}
