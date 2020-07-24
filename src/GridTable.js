import React from "react";

const Grid = ({ rows, columns, children }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: `[tl-row-header-start] 1fr [tl-row-header-end row-header-start row-start] repeat(${rows}, 1fr [row-end row-header-end row-header-start row-start])`,
        gridTemplateColumns: `[tl-col-header-start] 1fr [tl-col-header-end col-header-start col-start] repeat(${columns}, 1fr [col-end col-header-end col-header-start col-start])`
      }}
    >
      {children}
    </div>
  );
};

const GridHeaders = ({ rows, cols, config }) => {
  return (
    <>
      <GridCornerHeader config={config} />
      <GridRowHeaders rows={rows} config={config} />
      <GridColumnHeaders cols={cols} config={config} />
    </>
  );
};

const GridCornerHeader = ({ children, config }) => {
  const gridCornerConfig = config.gridCorner || {};

  const {
    GridCornerComponent = GridTopLeftHeaderItem,
    renderGridCorner = () => <div>TL</div>
  } = gridCornerConfig;
  return (
    <GridCornerComponent
      style={{
        gridRow: `tl-row-header-start / tl-row-header-end`,
        gridColumn: `tl-col-header-start / tl-col-header-end`,
        backgroundColor: "rgb(255, 255, 135)"
      }}
    >
      {renderGridCorner({ children, config })}
    </GridCornerComponent>
  );
};

const GridTopLeftHeaderItem = ({ children }) => (
  <div
    style={{
      // gridRow: `tl-row-header-start / tl-row-header-end`,
      // gridColumn: `tl-col-header-start / tl-col-header-end`,
      backgroundColor: "aqua"
    }}
  >
    {children}
  </div>
);

const GridRowHeaders = ({ rows, config }) => (
  <>
    {rows.map(row => (
      <GridRowHeaderItem key={row} row={row} config={config} />
    ))}
  </>
);

const GridRowHeaderItem = ({ row, config }) => {
  const defaultRenderItem = ({ row }) => {
    return <>Row {row}</>;
  };

  const gridRowConfig = config?.gridRow || {};

  const {
    GridRowComponent = props => <div {...props} />,
    renderGridRow = defaultRenderItem
  } = gridRowConfig;

  return (
    <div
      style={{
        gridRow: `row-header-start ${row}/ row-header-end ${row}`,
        gridColumn: `tl-col-header-start / tl-col-header-end`,
        backgroundColor: "rgb(255, 255, 235)"
      }}
    >
      <GridRowComponent row={row}>{renderGridRow({ row })}</GridRowComponent>
    </div>
  );
};

const GridColumnHeaders = ({ cols, config }) => (
  <>
    {cols.map(col => (
      <GridColumnHeaderItem key={col} col={col} config={config}>
        Col {col}
      </GridColumnHeaderItem>
    ))}
  </>
);

const GridColumnHeaderItem = ({ col, config, children }) => {
  const defaultRenderItem = ({ col }) => {
    return <>Col {col}</>;
  };

  const gridColumnConfig = config?.gridColumn || {};

  const {
    GridColumnComponent = props => <div {...props} />,
    renderGridColumn = defaultRenderItem
  } = gridColumnConfig;

  return (
    <div
      style={{
        gridRow: `tl-row-header-start / tl-row-header-start`,
        gridColumn: `col-header-start ${col} / col-header-end ${col}`,
        backgroundColor: "rgb(255, 255,235)"
      }}
    >
      <GridColumnComponent col={col}>
        {renderGridColumn({ col })}
      </GridColumnComponent>
    </div>
  );
};

const GridCells2 = ({ items, config }) => (
  <>
    {items.map(item => {
      const { row, col } = getItemCoords(item);
      return <GridCell2 key={`${row}-${col}`} item={item} config={config} />;
    })}
  </>
);

const GridCell2 = ({ item, config }) => {
  const { row, col } = getItemCoords(item);
  const defaultRenderItem = ({ row, col }) => {
    return (
      <>
        Row {row}, Col {col}
      </>
    );
  };

  const gridCell2Config = config?.gridCell2 || {};

  const {
    GridCell2Component = props => <div {...props} />,
    renderGridCell2 = defaultRenderItem
  } = gridCell2Config;

  return (
    <div
      style={{
        gridRow: `row-start ${+row} / row-end ${+row}`,
        gridColumn: `col-start ${+col} / col-end ${+col}`,
        backgroundColor: "#ccc"
      }}
    >
      <GridCell2Component item={item} row={row} col={col}>
        {renderGridCell2({ item, row, col })}
      </GridCell2Component>
    </div>
  );
};

const GridContainer = ({ rows, cols, items, config }) => {
  const {
    gridDimensions: { gridRowsCount, gridColsCount }
  } = config;
  return (
    <Grid rows={gridRowsCount} columns={gridColsCount}>
      <GridHeaders rows={rows} cols={cols} config={config} />
      <GridCells2 items={items} config={config} />
    </Grid>
  );
};

const GridTable = ({
  rows,
  cols,
  items,
  config = {
    gridDimensions: { gridRowsCount: 0, gridColsCount: 0 },
    gridCorner: {
      GridCornerComponent: undefined,
      renderGridCorner: undefined
    },
    gridRow: {
      GridRowComponent: undefined,
      renderGridRow: undefined
    },
    gridColumn: {
      GridColumnComponent: undefined,
      renderGridColumn: undefined
    },

    gridCell2: {
      GridCell2Component: undefined,
      renderGridCell2: undefined
    }
  },
  ...rest
}) => {
  config.gridDimensions = calcGridDimensions(rows, cols);
  return (
    <GridContainer
      rows={rows}
      cols={cols}
      items={items}
      config={config}
      {...rest}
    />
  );
};

const getItemCoords = item => {
  const [row, col] = item;
  return { row, col };
};
const calcGridDimensions = (rows, cols) => {
  const gridRowsCount = rows.length + (cols.length ? 1 : 0);
  const gridColsCount = cols.length + (rows.length ? 1 : 0);

  return {
    gridRowsCount,
    gridColsCount
  };
};

export default GridTable;
