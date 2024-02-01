import ts from 'typescript'

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

export const tsPrinter = (node: ts.Node) => {
  return printer.printNode(
    ts.EmitHint.Unspecified,
    node,
    ts.createSourceFile('', '', ts.ScriptTarget.Latest)
  )
}
