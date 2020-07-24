import React from "react";
import Collapse from "./Collapse";
import GridTable from "./GridTable";
import "./styles.css";

const CornerComponent = () => <div>CORNER</div>;

const RowComponent = ({ row }) => <div>ROW {row}</div>;

const ColumnComponent = ({ col }) => <div>COL {col}</div>;

const CellComponent = ({ item }) => {
  return (
    <div>
      CELL {item[0]},{item[1]}
    </div>
  );
};

export default function App() {
  const rows = [1, 2, 3, 4, 5];
  const cols = [1, 2, 3, 4, 5, 6, 7];

  const items = [[1, 1], [5, 7], [5, 1], [1, 7], [3, 4]];

  return (
    <div className="App">
      <Collapse collapsed={true} label="default">
        <GridTable rows={rows} cols={cols} items={items} />
      </Collapse>

      <Collapse collapsed={true} label="gridCorner">
        <Collapse collapsed={true} label="renderGridCorner">
          <GridTable
            rows={[...rows, 6, 7, 8]}
            cols={[...cols, 8, 9]}
            items={items}
            config={{
              gridCorner: {
                renderGridCorner: () => {
                  return <div>renderTL</div>;
                }
              }
            }}
          />
        </Collapse>

        <Collapse collapsed={true} label="GridCornerComponent">
          <GridTable
            rows={rows}
            cols={cols}
            items={items}
            config={{
              gridCorner: {
                GridCornerComponent: CornerComponent
              }
            }}
          />
        </Collapse>
      </Collapse>

      <Collapse collapsed={true} label="gridRow">
        <Collapse collapsed={true} label="renderGridRow">
          <GridTable
            rows={[...rows, 6, 7, 8]}
            cols={[...cols, 8, 9]}
            items={items}
            config={{
              gridRow: {
                renderGridRow: ({ row }) => {
                  return <div>r:{row}</div>;
                }
              }
            }}
          />
        </Collapse>

        <Collapse collapsed={true} label="GridRowComponent">
          <GridTable
            rows={[...rows, 6, 7, 8]}
            cols={[...cols, 8, 9]}
            items={items}
            config={{
              gridRow: {
                GridRowComponent: RowComponent
              }
            }}
          />
        </Collapse>
      </Collapse>

      <Collapse collapsed={true} label="gridColumn">
        <Collapse collapsed={true} label="renderGridColumn">
          <GridTable
            rows={[...rows, 6, 7, 8]}
            cols={[...cols, 8, 9]}
            items={items}
            config={{
              gridColumn: {
                renderGridColumn: ({ col }) => {
                  return <div>c:{col}</div>;
                }
              }
            }}
          />
        </Collapse>

        <Collapse collapsed={true} label="GridColumnComponent">
          <GridTable
            rows={[...rows, 6, 7, 8]}
            cols={[...cols, 8, 9]}
            items={items}
            config={{
              gridColumn: {
                GridColumnComponent: ColumnComponent
              }
            }}
          />
        </Collapse>
      </Collapse>

      <Collapse collapsed={true} label="gridCell">
        <Collapse collapsed={true} label="renderGridCell">
          <GridTable
            rows={[...rows, 6, 7, 8]}
            cols={[...cols, 8, 9]}
            items={items}
            config={{
              gridCell2: {
                renderGridCell: ({ row, col }) => {
                  return (
                    <div>
                      r:{row} c:{col}
                    </div>
                  );
                }
              }
            }}
          />
        </Collapse>

        <Collapse collapsed={true} label="GridCellComponent">
          <GridTable
            rows={[...rows, 6, 7, 8]}
            cols={[...cols, 8, 9]}
            items={items}
            config={{
              gridCell: {
                GridCellComponent: CellComponent
              }
            }}
          />
        </Collapse>
      </Collapse>
    </div>
  );
}
