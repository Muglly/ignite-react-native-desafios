/* eslint-disable no-useless-catch */
import { ReactNode, createContext, useState } from 'react'
import { MealByDayDTO } from '@dtos/MealByDayDTO'
import { MealDTO } from '@dtos/MealDTO'

type MealContextProviderProps = {
  children: ReactNode
}

type MealContextDataProps = {
  meal: MealByDayDTO[]
  saveMeal: (mealData: MealDTO) => void
  removeMeal: (mealId: string) => void
}

export const MealContext = createContext<MealContextDataProps>(
  {} as MealContextDataProps,
)

export function MealContextProvider({ children }: MealContextProviderProps) {
  const [meal, setMeal] = useState<MealByDayDTO[]>([])

  function saveMeal(mealData: MealDTO) {
    try {
      setMeal((meal) => {
        const newMeal = [...meal]

        const findMealByDay = newMeal.find(
          (meal) => meal.title === mealData.date,
        )

        if (findMealByDay) {
          findMealByDay.data.push(mealData)

          findMealByDay.data.sort((a, b) => {
            return b.time.localeCompare(a.time)
          })
        } else {
          const mealByDay = {
            title: mealData.date,
            data: [mealData],
          }
          newMeal.push(mealByDay)
        }

        return newMeal.sort((a, b) => {
          return b.title.localeCompare(a.title)
        })
      })
    } catch (error) {
      throw error
    }
  }

  function removeMeal(mealId: string) {
    try {
      setMeal((meals) => {
        const updatedMeals = meals.map((meal) => {
          meal.data = meal.data.filter((data) => data.id !== mealId)
          return meal
        })

        return updatedMeals.filter((meal) => meal.data.length > 0)
      })
    } catch (error) {
      throw error
    }
  }

  return (
    <MealContext.Provider value={{ meal, saveMeal, removeMeal }}>
      {children}
    </MealContext.Provider>
  )
}
