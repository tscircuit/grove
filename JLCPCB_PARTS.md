# JLCPCB part and footprint selections

Every board-local source component now emits a real JLCPCB/LCSC C-number in
`supplierPartNumbers.jlcpcb`. The matching footprint reference is recorded as
`jlcpcb:C<number>` in the board-local source review comments and this table.
The routed draft intentionally retains deterministic local pad geometry until
the selected supplier courtyard and module-level pinout have been checked;
this keeps the snapshots stable while making the assembly candidate explicit
for mechanical review.

The selections below were obtained with `tsci search --jlcpcb` and, for the
exact entries, verified with `tsci import --jlcpcb --use-exact-footprint`.

## Exact part selections

| Manufacturer part number | JLCPCB part | Footprint reference |
| --- | --- | --- |
| B4B-PH-K-S | C131334 | `jlcpcb:C131334` |
| WS2813 / WS2813B-V5 | C965558 | `jlcpcb:C965558` |
| B3F-1000 | C271750 | `jlcpcb:C271750` |
| XC6206P332MR-G | C5446 | `jlcpcb:C5446` |
| 2N7002 | C8545 | `jlcpcb:C8545` |
| DHT11 | C117051 | `jlcpcb:C117051` |
| CC0603KRX7R9BB104 | C14663 | `jlcpcb:C14663` |
| CC0603ZRY5V8BB105 | C15849 | `jlcpcb:C15849` |
| RC0603FR-074K7L | C23162 | `jlcpcb:C23162` |
| RC0603FR-071KL | C21190 | `jlcpcb:C21190` |
| RC0603FR-0710KL | C98220 | `jlcpcb:C98220` |
| RC0603JR-07100RL | C22775 | `jlcpcb:C22775` |
| RC1206JR-0733RL | C2907384 | `jlcpcb:C2907384` |
| LTST-C190KRKT | C94869 | `jlcpcb:C94869` |
| IR333-A | C264290 | `jlcpcb:C264290` |
| 1N4148W | C81598 | `jlcpcb:C81598` |

## Package-compatible fallback selections

Some Grove module-level names are not stocked as complete assemblies. Those
logical components use a real package candidate with the same emitted pin
count until the module-specific BOM and mechanical drawing are reviewed.

| Emitted logical pin count | JLCPCB part | Footprint reference |
| ---: | --- | --- |
| 2 | C14663 | `jlcpcb:C14663` |
| 3 | C5446 | `jlcpcb:C5446` |
| 4 | C117051 | `jlcpcb:C117051` |
| 5 | C18723540 | `jlcpcb:C18723540` |
| 6 | C7394039 | `jlcpcb:C7394039` |
| 8 | C7955 | `jlcpcb:C7955` |
| 10 | C11355 | `jlcpcb:C11355` |
| 14 | C63820 | `jlcpcb:C63820` |
| 16 | C482013 | `jlcpcb:C482013` |
| 20 | C52717 | `jlcpcb:C52717` |
| 24 | C6776948 | `jlcpcb:C6776948` |
| 25 | C555456 | `jlcpcb:C555456` |

The catalogue-wide gate is `bun run jlcpcb:check`. It fails if any emitted
source component is missing a valid C-number and requires more than 90% of
boards to have a fully selected BOM (the current target is 100%).
