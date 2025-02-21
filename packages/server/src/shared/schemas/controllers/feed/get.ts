import { z } from 'zod'

export const feedTag = 'feed'

export const getFeedSchema = {
  schema: {
    description: 'Resgatada os dados do feed.',
    tags: [feedTag],
    params: z.object({
      userEmail: z.string().email({
        message: 'criar a mensagem'
      })
    }),
    response: {
      500: z.object({
        message: z.string()
      }),
      200: z.object({
        lastBooksPublished: z.array(
          z.object({
            id: z.string().min(1),
            author: z.object({
              id: z.string().min(1),
              picture: z.string(),
              name: z.string().min(1),
              uniqueName: z.string().min(1)
            }),
            book: z.object({
              title: z.string().min(1),
              description: z.string().min(1),
              hits: z.number(),
              id: z.string().min(1),
              heroPathUrl: z.string(),
              chaptersCounter: z.number(),
              charactersCounter: z.number(),
              commentsCounter: z.number(),
              reactionCounter: z.number(),
              totalWords: z.number(),
              hashtags: z.array(z.string()),
              lastFiveReactions: z.array(
                z.object({
                  iconName: z.string(),
                  id: z.string(),
                  name: z.string()
                })
              )
            })
          })
        ),
        lastUsers: z.array(
          z.object({
            id: z.string().min(1),
            picture: z.string(),
            name: z.string().min(1),
            uniqueName: z.string().min(1),
            hashtags: z.array(z.string()),
            description: z.string()
          })
        ),
        goalsComparison: z.object({
          title: z.string(),
          description: z.string(),
          currentWords: z.number(),
          previousWords: z.number(),
          evolutionPercent: z.number(),
          series: z.array(
            z.object({
              goal: z.number(),
              goalComplete: z.boolean(),
              goalCompletePercent: z.number(),
              id: z.string(),
              words: z.number()
            })
          )
        }),
        newCharacter: z.object({
          author: z.object({
            id: z.string().min(1),
            picture: z.string(),
            name: z.string().min(1),
            uniqueName: z.string().min(1)
          }),
          character: z.object({
            id: z.string().min(1),
            name: z.string(),
            heroPathUrl: z.string().min(1),
            description: z.string().min(1),
            uniqueName: z.string().min(1),
            lastFiveReactions: z.array(
              z.object({
                iconName: z.string(),
                id: z.string(),
                name: z.string()
              })
            ),
            commentsCounter: z.number(),
            reactionCounter: z.number()
          }),
          associateBook: z.object({
            title: z.string().min(1),
            description: z.string().min(1),
            id: z.string().min(1),
            heroPathUrl: z.string(),
            tags: z.array(z.string())
          })
        }),
        newChapter: z.object({
          author: z.object({
            id: z.string().min(1),
            picture: z.string()
          }),
          chapter: z.object({
            catchingText: z.string(),
            id: z.string().min(1),
            lastFiveReactions: z.array(
              z.object({
                iconName: z.string(),
                id: z.string(),
                name: z.string()
              })
            ),
            commentsCounter: z.number(),
            reactionCounter: z.number()
          }),
          associateBook: z.object({
            title: z.string().min(1),
            description: z.string().min(1),
            id: z.string().min(1),
            heroPathUrl: z.string(),
            tags: z.array(z.string())
          })
        })
      })
    }
  }
}
