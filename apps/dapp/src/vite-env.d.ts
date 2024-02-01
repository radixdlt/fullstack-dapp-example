declare module 'virtual:*' {
  const GlossaryContent: Record<
    'en',
    {
      title: string
      content: string
    }[]
  >

  export { GlossaryContent }
}
