// Base API URL - ganti dengan URL API JTV yang sebenarnya
const BASE_URL = import.meta.env.VITE_API_URL || 'https://api.jtv.co.id/v1'

async function fetchJSON(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`)
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
  return response.json()
}

// Programs
export const getPrograms = () => fetchJSON('/programs')
export const getProgramById = (id) => fetchJSON(`/programs/${id}`)
export const getFeaturedPrograms = () => fetchJSON('/programs?featured=true')
export const getLatestPrograms = () => fetchJSON('/programs?sort=latest')
export const getPopularPrograms = () => fetchJSON('/programs?sort=popular')

// Events
export const getEvents = () => fetchJSON('/events')
export const getEventById = (id) => fetchJSON(`/events/${id}`)
export const getLatestEvents = () => fetchJSON('/events?sort=latest')

// Careers
export const getCareers = () => fetchJSON('/careers')
export const getCareerById = (id) => fetchJSON(`/careers/${id}`)

// Banners / Hero Slider
export const getBanners = () => fetchJSON('/banners')

export default {
  getPrograms,
  getProgramById,
  getFeaturedPrograms,
  getLatestPrograms,
  getPopularPrograms,
  getEvents,
  getEventById,
  getLatestEvents,
  getCareers,
  getCareerById,
  getBanners,
}