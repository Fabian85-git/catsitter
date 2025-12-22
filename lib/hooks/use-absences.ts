"use client"

import { useState, useEffect } from "react"
import { absencesStore } from "../data-store"
import type { Absence } from "../types"

export function useAbsences() {
  const [absences, setAbsences] = useState<Absence[]>([])
  const [loading, setLoading] = useState(true)

  const loadAbsences = () => {
    const data = absencesStore.getAll()
    setAbsences(data)
    setLoading(false)
  }

  useEffect(() => {
    loadAbsences()
  }, [])

  const addAbsence = (absence: Omit<Absence, "id" | "createdAt">) => {
    const newAbsence = absencesStore.add(absence)
    loadAbsences()
    return newAbsence
  }

  const updateAbsence = (id: string, updates: Partial<Absence>) => {
    const updated = absencesStore.update(id, updates)
    if (updated) {
      loadAbsences()
    }
    return updated
  }

  const deleteAbsence = (id: string) => {
    const success = absencesStore.delete(id)
    if (success) {
      loadAbsences()
    }
    return success
  }

  const getAbsence = (id: string) => {
    return absencesStore.getById(id)
  }

  return {
    absences,
    loading,
    addAbsence,
    updateAbsence,
    deleteAbsence,
    getAbsence,
    refresh: loadAbsences,
  }
}
