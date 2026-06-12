#include <stdio.h>
#include <stdlib.h>
void constantSpace(int n) {
int a = 10, b = 20, sum;
sum = a + b;
printf("Constant Space Result: %d\n", sum);
}

void linearSpace(int n) {
int *arr = (int *)malloc(n * sizeof(int));
for(int i = 0; i < n; i++)
arr[i] = i;
printf("Linear Space Last Element: %d\n", arr[n-1]);
free(arr);
}
void quadraticSpace(int n) {
int **matrix = (int **)malloc(n * sizeof(int*));
for(int i = 0; i < n; i++)
matrix[i] = (int *)malloc(n * sizeof(int));
matrix[n-1][n-1] = 1;
printf("Quadratic Space Element: %d\n", matrix[n-1][n-1]);

for(int i = 0; i < n; i++)
free(matrix[i]);
free(matrix);
}
int main() {
int n;
printf("Enter value of n: ");
scanf("%d", &n);
constantSpace(n);
linearSpace(n);
quadraticSpace(n);
return 0;
}
