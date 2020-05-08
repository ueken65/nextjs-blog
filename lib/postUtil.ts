import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

export default class PostUtil {
  postsDirectory: any

  constructor(postsDirectory: any = path.join(process.cwd(), 'posts')) {
    this.postsDirectory = postsDirectory
  }

  getSortedPostsData = () => {
    const fileNames = fs.readdirSync(this.postsDirectory)
    const allPostsData = fileNames.map(fileName => {
      const id = fileName.replace(/\.md$/, '')

      const fullPath = path.join(this.postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      const matterResult = matter(fileContents)

      return {
        id,
        ...(matterResult.data as {date: string; title: string})
      }
    })

    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } 
      return -1
    })
  }

  getAllPostIds = () => {
    const fileNames = fs.readdirSync(this.postsDirectory)

    return fileNames.map(fileName => {
      return {
        params: {
          id: fileName.replace(/\.md$/, '')
        }
      }
    })
  }

  getPostData = async (id: string) => {
    const fullPath = path.join(this.postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content)
    const contentHtml = processedContent.toString()

    return {
      id,
      contentHtml,
      ...matterResult.data
    }
  }
}
