import { defineStore } from 'pinia'

export type PanierItem = {
  id: string    // mielId (UUID back)
  nom: string
  prix: number
  quantite: number
  type?: string
  date?: string
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    commandeId: null as string | null,
    email: '' as string,
    items: [] as PanierItem[],
  }),
  getters: {
    total: (s) => s.items.reduce((t, i) => t + i.quantite * i.prix, 0),
    count: (s) => s.items.reduce((t, i) => t + i.quantite, 0),
  },
  actions: {
    setEmail(e: string) { this.email = e },
    setCommandeId(id: string) { this.commandeId = id },

    add(item: Omit<PanierItem, 'quantite'>, qte = 1) {
      const exist = this.items.find(i => i.id === item.id)
      if (exist) exist.quantite += qte
      else this.items.push({ ...item, quantite: qte })
    },
    updateQty(id: string, qte: number) {
      const it = this.items.find(i => i.id === id)
      if (!it) return
      it.quantite = Math.max(1, qte)
    },
    remove(id: string) {
      this.items = this.items.filter(i => i.id !== id)
    },
    clear() {
      this.items = []
      this.commandeId = null
      this.email = ''
    }
  },
  // Si tu as mis le plugin de persistance :
   persist: {
    key: 'cart',
    paths: ['items', 'email', 'commandeId'], // optionnel : ce que tu veux persister
    // pas de "storage: localStorage" ici
  }
})
