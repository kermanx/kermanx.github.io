# The Triton Language

## `tl.make_block_ptr`

- https://nathanchen.me/public/Triton-make-block-ptr-Guide.html

```py
x_ptr = tl.make_block_ptr(
  base=q + (bos * HQ + i_hq) * K,
  shape=(T, K),
  strides=(HQ*K, 1),
  offsets=(i_t * BT, 0),
  block_shape=(BT, BK),
  # order=(0, 1)
)
```

This function doesn't actually load any data. Instead, it creates a smart "viewfinder" that tells a program exactly where and how to access a small tile of data from a large tensor.

- `base` + `shape` + `strides`: the whole view
- `offsets` + `block_shape`: the small tile

```py
x_ptr.advance((BT, BK))
```

- advance offsets are decoupled with `block_shape`:
  - offsets < `block_shape`: convolution

