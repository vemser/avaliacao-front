import { useEffect, useState } from 'react';

function useDebouce(value: any, delay: any = 500): any {
  const [deboucedValue, setDeboucedValue] = useState<any>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDeboucedValue(value), delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return deboucedValue
}

export default useDebouce