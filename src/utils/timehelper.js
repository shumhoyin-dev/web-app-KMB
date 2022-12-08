const TimeHelper = {}

TimeHelper.getAbsMinuteDiff = (ts1, ts2) => {
  const d1 = ts1 ? new Date(ts1) : new Date() // empty = now
  const d2 = ts2 ? new Date(ts2) : new Date() // empty = now
  return Math.floor(Math.abs(d1.getTime() - d2.getTime()) / 1000 / 60)
}

export default TimeHelper
