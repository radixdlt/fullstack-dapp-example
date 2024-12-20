export const imgDir = 'https://flowbite-admin-dashboard.vercel.app/images'

/** @type {(x:string, ...y:string[]) => string} */
export const imagesPath = (src, ...subdirs) => [imgDir, ...subdirs, src].filter(Boolean).join('/')
