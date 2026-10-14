# Lens: correctness of migrations and data safety

- Migration steps that are not reversible, or that would fail against
  existing data.
- Backfills and data transforms that could corrupt or lose rows, or that
  assume a clean slate.
- Ordering hazards between a schema change and the code that depends on
  it.
