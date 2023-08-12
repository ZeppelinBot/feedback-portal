import React, { HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";

const cn = (...args: Array<string | undefined>) => args.map(v => String(v)).join(" ");

export const TableContainer = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => {
  return (
    <div
      className={cn("border border-gray-300 rounded overflow-hidden shadow", className)}
      ref={ref}
    >
      {children}
    </div>
  );
});

export const Table = React.forwardRef<HTMLTableElement, TableHTMLAttributes<HTMLTableElement>>(({ className, children, ...props }, ref) => {
  return (
    <table
      className={cn("w-full", className)}
      ref={ref}
      {...props}
    >
      {children}
    </table>
  );
});

export const Th = React.forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(({ className, children, ...props }, ref) => {
  return (
    <th
      className={cn("bg-gray-50 font-semibold px-3 py-2 text-left border-b border-b-gray-300 border-r border-r-gray-200 last:border-b-none", className)}
      ref={ref}
      {...props}
    >
      {children}
    </th>
  );
});

export const BodyTr = React.forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(({ className, children, ...props }, ref) => {
  return (
    <tr
      className={cn("border-b border-gray-300 last:border-none", className)}
      ref={ref}
      {...props}
    >
      {children}
    </tr>
  );
});

export const Td = React.forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(({ className, children, ...props }, ref) => {
  return (
    <td
      className={cn("px-3 py-2 text-left bg-white border-r border-gray-200 last:border-none", className)}
      ref={ref}
      {...props}
    >
      {children}
    </td>
  );
});
