"use client";
import {
  Box,
  Grid,
  GridItem,
  VStack,
  Spinner,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Coins, Users, ShoppingCart } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import type { UserProfile, UserStats, Activity } from "@/lib/types/user";
import UserProfileCard from "@/components/user-profile-card";
import StatsCard from "@/components/stats-card";
import ActivityFeed from "@/components/activity-feed";

interface DashboardClientProps {
  user: User;
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const toast = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch profile, stats, and activities in parallel
      const [profileRes, statsRes, activitiesRes] = await Promise.all([
        fetch("/api/user/profile"),
        fetch("/api/user/stats"),
        fetch("/api/user/activities?limit=20"),
      ]);

      const [profileData, statsData, activitiesData] = await Promise.all([
        profileRes.json(),
        statsRes.json(),
        activitiesRes.json(),
      ]);

      if (profileData.success) {
        setProfile(profileData.data);
      } else {
        toast({
          title: "Error",
          description: profileData.error || "Failed to fetch profile",
          status: "error",
          duration: 3000,
        });
      }

      if (statsData.success) {
        setStats(statsData.data);
      }

      if (activitiesData.success) {
        setActivities(activitiesData.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading || !profile || !stats) {
    return (
      <Flex justify="center" align="center" minH="60vh">
        <Spinner size="xl" color="brand.500" />
      </Flex>
    );
  }

  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "320px 1fr" }}
      gap={6}
      alignItems="start"
    >
      {/* Left Sidebar - Profile Card */}
      <GridItem>
        <UserProfileCard
          profile={profile}
          userEmail={user.email || ""}
          onProfileUpdate={fetchDashboardData}
        />
      </GridItem>

      {/* Right Content - Stats & Activity */}
      <GridItem>
        <VStack spacing={6} align="stretch">
          {/* Stats Cards */}
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
            gap={6}
          >
            <StatsCard
              icon={Coins}
              label="Total Points"
              value={stats.total_points}
              iconBg="brand.500"
            />
            <StatsCard
              icon={Users}
              label="Total Referral"
              value={stats.referral_count}
              iconBg="brand.500"
            />
            <StatsCard
              icon={ShoppingCart}
              label="Services Purchased"
              value={stats.services_purchased}
              iconBg="brand.500"
            />
          </Grid>

          {/* Activity Feed */}
          <ActivityFeed activities={activities} />
        </VStack>
      </GridItem>
    </Grid>
  );
}
