import ts from 'typescript'
export const createStringObjectEntry = (key: string, value: string) => {
  return ts.factory.createPropertyAssignment(key, ts.factory.createStringLiteral(value))
}
