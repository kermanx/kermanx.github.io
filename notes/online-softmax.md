# Online Normalizer Calculation for Softmax

> by Maxim Milakov and Natalia Gimelshein, 2018
>
> https://arxiv.org/abs/1805.02867

## Original softmax

$$
y_i = \frac{e^{x_i}}{\sum\limits_{j=1}^{V}{e^{x_j}}}
$$

## Naive algorithm

```py
d[0] = 0
for j in range(1, V+1):
  d[j] = d[j-1] + e**x[j]
for i in range(1, V+1):
  y[i] = e**x[i] / d[V]
```

- May overflow due to the exponent.

## Safe version

```py
m[0] = float('-inf')
for k in range(1, V+1):
  m[k] = max(m[k-1], x[k])
d[0] = 0
for j in range(1, V+1):
  d[j] = d[j-1] + e**(x[j] - m[V])
for i in range(1, V+1):
  y[i] = e**(x[i] - m[V]) / d[V]
```

- Requires three passes over the input vector.

## Online normalizer calculation

```py
m[0] = float('-inf')
d[0] = 0
for j in range(1, V+1):
  m[j] = max(m[j-1], x[j])
  d[j] = d[j-1] * e**(m[j-1] - m[j]) + e**(x[j] - m[j])
for i in range(1, V+1):
  y[i] = e**(x[i] - m[V]) / d[V]
```

- Reduced to two passes.
- Reduced memory accesses from 4 to 3 per element.

## Parallel online normalizer calculation

$$
\begin{bmatrix}m_V\\d_V\end{bmatrix} = \begin{bmatrix}x_1\\1\end{bmatrix}\oplus\begin{bmatrix}x_2\\1\end{bmatrix}\oplus ...\oplus\begin{bmatrix}x_V\\1\end{bmatrix}
$$

where

$$
\begin{bmatrix}m_i\\d_i\end{bmatrix}\oplus\begin{bmatrix}m_j\\d_j\end{bmatrix} = \begin{bmatrix}\max\left(m_i,m_j\right)\\d_i\times e^{m_i-\max\left(m_i,m_j\right)}+d_j\times e^{m_j-\max\left(m_i,m_j\right)}\end{bmatrix}
$$

- Associative, which enables parallel evaluation.
- Commutative, which provides more flexibility.

## Softmax and TopK fusion

- TopK itself requires 5 memory accesses per element.
- Online softmax + TopK = 5 + 4 = 9 accesses.

```py
m[0] = float('-inf')
d[0] = 0
u = [float('-inf') for _ in range(K+1)]
p = [-1 for _ in range(K+1)]
for j in range(1, V+1):
  m[j] = max(m[j-1], x[j])
  d[j] = d[j-1] * e**(m[j-1] - m[j]) + e**(x[j] - m[j])
  u[K+1] = x[j]
  p[K+1] = j
  k = K
  while k >= 1 and u[k] < u[k+1]:
    u[k], u[k+1] = u[k+1], u[k]
    p[k], p[k+1] = p[k+1], p[k]
    k -= 1
for i in range(1, k+1):
  v[i] = e**(u[i]-m[V])/d[V]
  z[i] = p[i]
```

- Fused version requires 5 accesses.

## Benchmark

- Online softmax:
  - V>1000: ~1.3x faster than safe softmax
  - Close to naive softmax
- Softmax TopK Fused:
  - K=5, V=25000: 5x = 2.5x (softmax) \* 2x (fusion)
  - larger K, less improvement

> Smaller vector size: GPU is underutilized, and the performance is limited not by the memory bandwidth, but various latencies.
