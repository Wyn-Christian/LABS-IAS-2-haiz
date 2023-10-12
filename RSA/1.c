#include <math.h>
#include <stdio.h>
#include <string.h>

long int p, q, n, t, e[100], d[100], temp[100], m[100], en[100];
char msg[100];

int is_prime(long int pr);
void find_possible_keys();
long int find_d(long int x);
void rsa_encrypt();
void rsa_decrypt();

int main() {
  printf("\nENTER FIRST PRIME NUMBER: ");
  scanf("%ld", &p);
  if (!is_prime(p)) {
    printf("\nWRONG INPUT\n");
    return 1;
  }

  printf("\nENTER ANOTHER PRIME NUMBER: ");
  scanf("%ld", &q);
  if (!is_prime(q) || p == q) {
    printf("\nWRONG INPUT\n");
    return 1;
  }

  printf("\nENTER MESSAGE: ");
  scanf("%s", msg);
  for (int i = 0; msg[i] != '\0'; i++) {
    m[i] = msg[i];
  }

  n = p * q;
  t = (p - 1) * (q - 1);

  find_possible_keys();

  printf("\nPOSSIBLE VALUES OF e AND d ARE:\n");
  for (int i = 0; i < 99 && e[i] != 0 && d[i] != 0; i++) {
    printf("\n%ld\t%ld", e[i], d[i]);
  }

  rsa_encrypt();
  rsa_decrypt();

  return 0;
}

int is_prime(long int pr) {
  for (int i = 2; i <= sqrt(pr); i++) {
    if (pr % i == 0) return 0;
  }
  return 1;
}

void find_possible_keys() {
  int k = 0;
  for (long int i = 2; i < t; i++) {
    if (t % i != 0 && is_prime(i) && i != p && i != q) {
      e[k] = i;
      long int flag = find_d(e[k]);
      if (flag > 0) {
        d[k] = flag;
        k++;
      }
      if (k == 99) break;
    }
  }
}

long int find_d(long int x) {
  long int k = 1;
  while (1) {
    k += t;
    if (k % x == 0) return (k / x);
  }
}

void rsa_encrypt() {
  long int key = e[0];
  int i = 0;
  for (i = 0; msg[i] != '\0'; i++) {
    long int pt = m[i] - 96;
    temp[i] = 1;
    for (int j = 0; j < key; j++) {
      temp[i] = temp[i] * pt % n;
    }
    en[i] = temp[i] + 96;
  }
  en[i] = -1;
  printf("\nTHE ENCRYPTED MESSAGE IS: ");
  for (int i = 0; en[i] != -1; i++) {
    printf("%c", en[i]);
  }
  printf("\n");
}

void rsa_decrypt() {
  long int key = d[0];
  int i = 0;
  for (i = 0; en[i] != -1; i++) {
    long int ct = temp[i];
    m[i] = 1;
    for (int j = 0; j < key; j++) {
      m[i] = m[i] * ct % n;
    }
    m[i] += 96;
  }
  m[i] = -1;
  printf("THE DECRYPTED MESSAGE IS: ");
  for (int i = 0; m[i] != -1; i++) {
    printf("%c", m[i]);
  }
  printf("\n");
}
