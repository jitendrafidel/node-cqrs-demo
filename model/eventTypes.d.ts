
export type Event = CreateEventUnion<Events>

export type Events = {
  RESOURCE_CREATED: {
    resourceId: string
    title: string|null
    description: string
    active: boolean
    created?: number
    updated?:number
  }

  RESOURCE_UPDATED: {
    resourceId: string
    title: string|null
    description: string
    active: boolean
    created?: number
    updated?:number
  }
  RESOURCE_DELETED: {
    resourceId: string
    title: string|null
    description: string
    active: boolean
    created?: number
    updated?:number
  }
}

type ConvertObjectToUnion<Obj extends object> = Obj[keyof Obj]
type CreateEventUnion<Events> = ConvertObjectToUnion<
  {
    [P in keyof Events]: {
      type: P
      timestamp?: number 
      committedAt?: number
      payload: Events[P]
    }
  }
  >


