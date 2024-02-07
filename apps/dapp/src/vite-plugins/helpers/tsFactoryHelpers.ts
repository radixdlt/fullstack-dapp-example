import ts from 'typescript'

export const createStringEntry = (key: string, value: string) => {
  return ts.factory.createPropertyAssignment(key, ts.factory.createStringLiteral(value))
}

export const createNumberEntry = (key: string, value: number) => {
  return ts.factory.createPropertyAssignment(key, ts.factory.createNumericLiteral(value))
}

export const createArrayEntry = (key: string, value: ts.Expression[]) => {
  return ts.factory.createPropertyAssignment(key, ts.factory.createArrayLiteralExpression(value))
}

export const createObject = (entries: ts.ObjectLiteralElementLike[]) => {
  return ts.factory.createObjectLiteralExpression(entries)
}