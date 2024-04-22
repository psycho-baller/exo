import { Home, Plus, Search, User, Users } from '@tamagui/lucide-icons'
import { BlurView } from 'expo-blur'
import { Link, Tabs, useSegments } from 'expo-router'

import { useAddPersonStore } from '@acme/app/stores/addQuestion'
import { useThemeName } from '@acme/ui'

export default function TabLayout() {
  const themeName = useThemeName()
  const segments = useSegments()
  const [dropdownOpen, setDropdownOpen] = useAddPersonStore((state) => [
    state.dropdownOpen,
    state.setDropdownOpen,
  ])

  return (
    <Tabs
      screenOptions={{
        // tabBarInactiveBackgroundColor: theme.background?.get(),
        // tabBarActiveBackgroundColor: theme.background?.get(),
        // tabBarInactiveTintColor: theme.text?.get(),
        headerShown: false,
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <BlurView
            intensity={50}
            tint={themeName === 'dark' ? 'dark' : 'extraLight'}
            style={{
              flex: 1,
              overflow: 'hidden',
              left: 10,
              right: 10,
              bottom: 17.5,
              top: -5,
              position: 'absolute',
              borderRadius: 999,
            }}
          />
        ),
        tabBarStyle: {
          display: segments[3] === '[id]' ? 'none' : 'flex',
          // transform: [{ translateY: segments[3] === '[id]' ? 100 : 0 }],
          // transformOrigin: 'bottom',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          height: 85,
        },
      }}
    >
      <Tabs.Screen
        name='questions'
        options={{
          title: 'Questions',
          tabBarIcon: ({ color, focused }) => (
            <Home size='$2.5' color={focused ? color : undefined} />
          ),
        }}
      />
      <Tabs.Screen
        name='people'
        options={{
          title: 'People',
          tabBarIcon: ({ size, color, focused }) => (
            <User size='$2.5' color={focused ? color : undefined} />
          ),
        }}
      />
      <Tabs.Screen
        name='addQuestion'
        options={{
          title: 'Add Question',
          tabBarIcon: ({ size, color, focused }) => (
            <Plus size='$3' color={focused ? color : undefined} />
          ),
          headerShown: false,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault()
            setDropdownOpen(true)
          },
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          title: 'Search',
          tabBarIcon: ({ size, color, focused }) => (
            <Search size='$2.5' color={focused ? color : undefined} />
          ),
        }}
      />
      <Tabs.Screen
        name='groups'
        options={{
          title: 'Groups',
          tabBarIcon: ({ size, color, focused }) => (
            <Users size='$2.5' color={focused ? color : undefined} />
          ),
        }}
      />
    </Tabs>
  )
}
