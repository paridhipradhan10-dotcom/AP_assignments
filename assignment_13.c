#include <stdio.h>
#include <stdlib.h>
#include <string.h>
typedef struct {
char *data;
size_t length;
size_t capacity;
} StringBuffer;

StringBuffer *sb_init(size_t initial_capacity) {
StringBuffer *sb = malloc(sizeof(StringBuffer));
if (sb == NULL) {
fprintf(stderr, "Error: malloc failed for StringBuffer
struct.\n");
return NULL;
}
sb->data = malloc(initial_capacity);
if (sb->data == NULL) {
fprintf(stderr, "Error: malloc failed for data buffer.\n");
free(sb);
return NULL;
}
sb->data[0] = '\0';
sb->length = 0;
sb->capacity = initial_capacity;
return sb;
}

int sb_append(StringBuffer *sb, const char *str) {
if (sb == NULL || str == NULL) return 0;
size_t str_len = strlen(str);
size_t needed = sb->length + str_len + 1;
if (needed > sb->capacity) {
size_t new_capacity = sb->capacity;
while (new_capacity < needed) {
new_capacity *= 2;
}
char *temp = realloc(sb->data, new_capacity);
if (temp == NULL) {
fprintf(stderr, "Error: realloc failed. Original data
preserved.\n");
return 0;
}
printf("[GROW] Capacity: %zu → %zu\n", sb->capacity,
new_capacity);
sb->data = temp;
sb->capacity = new_capacity;
}
memcpy(sb->data + sb->length, str, str_len + 1);
sb->length += str_len;
return 1;
}
void sb_free(StringBuffer *sb) {
if (sb == NULL) return;
free(sb->data);
sb->data = NULL;
sb->length = 0;
sb->capacity = 0;
free(sb);
}

int main(void) {
printf("=== Dynamic String Buffer Demo ===\n\n");
StringBuffer *sb = sb_init(8);
if (sb == NULL) return 1;
printf("Initial capacity : %zu\n", sb->capacity);
printf("Initial length : %zu\n\n", sb->length);
sb_append(sb, "Hello");
printf("After append \"Hello\" -> length: %zu, capacity: %zu\n",
sb->length, sb->capacity);

sb_append(sb, ", World");
printf("After append \", World\" -> length: %zu, capacity: %zu\n",
sb->length, sb->capacity);

sb_append(sb, "! Welcome to Dynamic Buffers in C.");
printf("After append long string -> length: %zu, capacity: %zu\n",
sb->length, sb->capacity);
printf("\nFinal string: \"%s\"\n", sb->data);
sb_free(sb);
printf("\nMemory freed successfully.\n");
return 0;
}
