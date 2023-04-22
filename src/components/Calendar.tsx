import { useContext } from 'react'
import { ThemeContext } from '../App'
import { DayJsContext } from '../main'
import { faNumber } from '../utils/faNumber'
import Month from './Month'

const Calendar = (): JSX.Element => {
  const { dayjs, currentDate } = useContext(DayJsContext)
  const theme = useContext(ThemeContext)
  const calendar = [...Array(12).keys()].reduce(
    (acc: dayjs.Dayjs[], el: number) => {
      return [...acc, dayjs().month(el)]
    },
    []
  )

  const toggleTheme = (): void => {
    const toggle = theme.state.darkMode ? 'light' : 'dark'
    localStorage.theme = toggle
    theme.dispatch({ payload: toggle })
  }

  return (
    <>
      <div className="flex items-center">
        <h1 className="font-black text-5xl dark:text-zinc-50 text-zinc-900">
          {faNumber(currentDate.format('YYYY'))}
        </h1>
        <div className="mr-auto">
          <button
            onClick={toggleTheme}
            className="w-6 h-6 hover:bg-zinc-100 flex items-center justify-center rounded text-zinc-600 dark:text-zinc-50 dark:hover:bg-zinc-800 transition duration-200"
          >
            {!theme.state.darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-20 my-24">
        {calendar.map((month, idx) => (
          <Month key={idx} month={month} />
        ))}
      </div>
    </>
  )
}

export default Calendar
