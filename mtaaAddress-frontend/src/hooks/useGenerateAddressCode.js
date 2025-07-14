export default function useGenerateAddressCode() {
  function generate(marker, landmark) {
    if (!marker || !landmark) return ''

    const randomNum = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0')

    const landmarkCode = landmark.replace(/\s+/g, '').substring(0, 7).toUpperCase()

    return `MTAA-AR${randomNum}-${landmarkCode}`
  }

  return { generate }
}
