import React from "react";

const DefaultComponent = props => <div {...props} />;
const defaultRender = () => <DefaultComponent />;

// const defaultRenderRow = ({ row }) => {
//   return <>Row {row}</>;
// };
// const defaultRenderColumn = ({ col }) => {
//   return <>Col {col}</>;
// };
// const defaultRenderCell = ({ row, col }) => {
//   return (
//     <>
//       Row {row}, Col {col}
//     </>
//   );
// };

const Grid = ({ rows, columns, config, children }) => {
  const { gridHeight } = config;
  const height = gridHeight ? { height: gridHeight } : {};
  console.log("Grid", height, gridHeight, config);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: `[tl-row-header-start] 1fr [tl-row-header-end row-header-start row-start] repeat(${rows}, 1fr [row-end row-header-end row-header-start row-start])`,
        gridTemplateColumns: `[tl-col-header-start] 1fr [tl-col-header-end col-header-start col-start] repeat(${columns}, 1fr [col-end col-header-end col-header-start col-start])`,
        ...height
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

const GridCornerHeader = ({ config }) => {
  const gridCornerConfig = config.gridCorner || {};

  const {
    GridCornerComponent, //= DefaultComponent,
    renderGridCorner //= defaultRender
  } = gridCornerConfig;

  return (
    <div
      style={{
        gridRow: `tl-row-header-start / tl-row-header-end`,
        gridColumn: `tl-col-header-start / tl-col-header-end`,
        backgroundColor: "rgb(255, 255, 135)"
      }}
    >
      {renderContent(GridCornerComponent, renderGridCorner, {})}
    </div>
  );
};

const GridRowHeaders = ({ rows, config }) => (
  <>
    {rows.map(row => (
      <GridRowHeaderItem key={row} row={row} config={config} />
    ))}
  </>
);

const GridRowHeaderItem = ({ row, config }) => {
  const gridRowConfig = config?.gridRow || {};

  const {
    GridRowComponent, //= DefaultComponent,
    renderGridRow //= defaultRenderRow
  } = gridRowConfig;

  return (
    <div
      style={{
        gridRow: `row-header-start ${row}/ row-header-end ${row}`,
        gridColumn: `tl-col-header-start / tl-col-header-end`,
        backgroundColor: "rgb(255, 255, 235)"
      }}
    >
      {renderContent(GridRowComponent, renderGridRow, { row })}
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
  const gridColumnConfig = config?.gridColumn || {};

  const {
    GridColumnComponent, //= DefaultComponent,
    renderGridColumn //= defaultRenderColumn
  } = gridColumnConfig;

  return (
    <div
      style={{
        gridRow: `tl-row-header-start / tl-row-header-start`,
        gridColumn: `col-header-start ${col} / col-header-end ${col}`,
        backgroundColor: "rgb(255, 255,235)"
      }}
    >
      {renderContent(GridColumnComponent, renderGridColumn, { col })}
    </div>
  );
};

const GridCells = ({ items, config }) => (
  <>
    {items.map(item => {
      const { row, col } = getItemCoords(item);
      return <GridCell key={`${row}-${col}`} item={item} config={config} />;
    })}
  </>
);

const GridCell = ({ item, config }) => {
  const { row, col } = getItemCoords(item);

  const gridCellConfig = config?.gridCell || {};

  const {
    GridCellComponent, //= DefaultComponent,
    renderGridCell //= defaultRenderCell
  } = gridCellConfig;

  return (
    <div
      style={{
        gridRow: `row-start ${+row} / row-end ${+row}`,
        gridColumn: `col-start ${+col} / col-end ${+col}`,
        backgroundColor: "#ccc"
      }}
    >
      {renderContent(GridCellComponent, renderGridCell, { item, row, col })}
    </div>
  );
};

const GridContainer = ({ rows, cols, items, config, style }) => {
  const {
    gridDimensions: { gridRowsCount, gridColsCount }
  } = config;
  return (
    <Grid rows={gridRowsCount} columns={gridColsCount} config={config}>
      <GridHeaders rows={rows} cols={cols} config={config} />
      <GridCells items={items} config={config} />
    </Grid>
  );
};

const GridTable = ({
  rows,
  cols,
  items,
  config = {
    gridHeight: undefined,
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
    gridCell: {
      GridCellComponent: undefined,
      renderGridCell: undefined
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

const renderContent = (RenderComponent, renderProp, props) => {
  if (RenderComponent && renderProp) {
    return <RenderComponent {...props}>{renderProp(props)}</RenderComponent>;
  } else if (RenderComponent) {
    return <RenderComponent {...props} />;
  } else if (renderProp) {
    return renderProp(props);
  } else {
    return defaultRender(props);
  }
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
