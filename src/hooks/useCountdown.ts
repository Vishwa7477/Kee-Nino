import { useState, useEffect, useRef } from 'react'

interface CountdownValues {
  days: number
  hours: number
  minutes: number
  seconds: number
  isWeddingDay: boolean
  isPast: boolean
}

/**
 * Calculates live countdown to a target date in IST (Asia/Kolkata).
 * Updates every second.
 */
export function useCountdown(targetDate: Date): CountdownValues {
  const calculateTimeLeft = (): CountdownValues => {
    // Get current time in ms
    const now = Date.now()
    const target = targetDate.getTime()
    const diff = target - now

    if (diff <= 0) {
      // Check if it's the same day as the wedding
      const nowDate = new Date(now)
      const targetDateObj = new Date(target)
      const sameDay =
        nowDate.getFullYear() === targetDateObj.getFullYear() &&
        nowDate.getMonth() === targetDateObj.getMonth() &&
        nowDate.getDate() === targetDateObj.getDate()

      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isWeddingDay: sameDay,
        isPast: diff < 0,
      }
    }

    const totalSeconds = Math.floor(diff / 1000)
    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return {
      days,
      hours,
      minutes,
      seconds,
      isWeddingDay: false,
      isPast: false,
    }
  }

  const [timeLeft, setTimeLeft] = useState<CountdownValues>(calculateTimeLeft)
  const prevValues = useRef(timeLeft)

  useEffect(() => {
    const interval = setInterval(() => {
      const next = calculateTimeLeft()
      prevValues.current = next
      setTimeLeft(next)
    }, 1000)

    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate.getTime()])

  return timeLeft
}
