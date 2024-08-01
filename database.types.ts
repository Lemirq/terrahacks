export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          age: number
          complete: boolean | null
          confidence: Json
          country: string
          created_at: string
          email: string
          first_name: string
          gender: string
          graduation: number | null
          hackathons_attended: number
          id: string
          last_name: string
          level_of_study: string
          major: string | null
          phone: number | null
          resume_url: string | null
          short_ans_1: string
          short_ans_2: string
          social: Json
          top_interests: string[]
          user_id: string | null
        }
        Insert: {
          age: number
          complete?: boolean | null
          confidence: Json
          country: string
          created_at?: string
          email: string
          first_name: string
          gender: string
          graduation?: number | null
          hackathons_attended: number
          id?: string
          last_name: string
          level_of_study: string
          major?: string | null
          phone?: number | null
          resume_url?: string | null
          short_ans_1: string
          short_ans_2: string
          social: Json
          top_interests: string[]
          user_id?: string | null
        }
        Update: {
          age?: number
          complete?: boolean | null
          confidence?: Json
          country?: string
          created_at?: string
          email?: string
          first_name?: string
          gender?: string
          graduation?: number | null
          hackathons_attended?: number
          id?: string
          last_name?: string
          level_of_study?: string
          major?: string | null
          phone?: number | null
          resume_url?: string | null
          short_ans_1?: string
          short_ans_2?: string
          social?: Json
          top_interests?: string[]
          user_id?: string | null
        }
        Relationships: []
      }
      email_list: {
        Row: {
          created_at: string
          email: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      faq: {
        Row: {
          answer: string
          category: number | null
          created_at: string
          id: number
          question: string
        }
        Insert: {
          answer: string
          category?: number | null
          created_at?: string
          id?: number
          question: string
        }
        Update: {
          answer?: string
          category?: number | null
          created_at?: string
          id?: number
          question?: string
        }
        Relationships: []
      }
      faq_categories: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          firstName: string
          lastName: string
          uid: string
        }
        Insert: {
          created_at?: string
          email: string
          firstName: string
          lastName: string
          uid?: string
        }
        Update: {
          created_at?: string
          email?: string
          firstName?: string
          lastName?: string
          uid?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      faq_category:
        | "General Information"
        | "Participation Details"
        | "Event Details"
        | "Support and Contact"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

