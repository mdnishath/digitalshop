"use client";

import { useParams } from "next/navigation";
import { useGetProductBySlugQuery } from "@/store/services/woocommerceApi";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Star, Minus, Plus } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Container from "../layouts/Container";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import Link from "next/link";

export default function ProductDetail() {
  const { slug } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductBySlugQuery(slug as string);

  const [qty, setQty] = useState(1);
  const [selectedOption, setSelectedOption] = useState("3m");

  if (isLoading) {
    return (
      <Container>
        <div className="grid md:grid-cols-2 gap-8 py-10">
          <div>
            <Skeleton className="h-5 w-[200px] mb-4" />
            <Skeleton className="h-[300px] w-full rounded" />
          </div>
          <div>
            <Card className="p-6 space-y-4 rounded-none">
              <CardHeader className="space-y-2 p-0">
                <Skeleton className="h-6 w-1/2" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-10" />
                </div>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-16 w-full" />
              </CardHeader>

              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-10 rounded" />
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-10 w-10 rounded" />
              </div>

              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />

              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="desc" className="w-full mt-10">
          <TabsList>
            <TabsTrigger value="desc">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="desc">
            <Skeleton className="h-24 w-full mt-4" />
          </TabsContent>
          <TabsContent value="reviews">
            <Skeleton className="h-6 w-1/4 mt-4" />
          </TabsContent>
        </Tabs>
      </Container>
    );
  }

  if (error || !product)
    return <p className="p-4 text-red-500">Product not found.</p>;

  const {
    images,
    name,
    price,
    regular_price,
    description,
    average_rating,
    categories,
    short_description,
  } = product[0];

  return (
    <Container>
      <div className="grid md:grid-cols-2 gap-8 py-10">
        <div>
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Link href="/" className="hover:underline text-foreground">
                Home
              </Link>
              <span className="mx-1">›</span>
              {categories?.[0] && (
                <>
                  <Link
                    href={`/category/${categories[0].slug}`}
                    className="hover:underline text-foreground"
                  >
                    {categories[0].name}
                  </Link>
                  <span className="mx-1">›</span>
                </>
              )}
              <span className="text-foreground font-medium">{name}</span>
            </div>
          </nav>

          <Image
            src={images?.[0]?.src || "/placeholder.webp"}
            alt={name}
            className="w-full rounded object-cover"
            width={600}
            height={300}
          />
        </div>

        <div>
          <Card className="p-6 space-y-4 rounded-none">
            <CardHeader className="space-y-2 p-0">
              <CardTitle className="text-2xl">{name}</CardTitle>
              <div className="flex items-center gap-2">
                <p className="text-primary text-lg font-semibold">৳{price}</p>
                {regular_price && (
                  <del className="text-muted-foreground line-through text-sm">
                    ৳{regular_price}
                  </del>
                )}
              </div>

              {average_rating && (
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{average_rating}</span>
                </div>
              )}

              <CardDescription
                dangerouslySetInnerHTML={{
                  __html:
                    short_description ||
                    "<p class='text-muted-foreground'>No short description.</p>",
                }}
              />
            </CardHeader>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
              >
                <Minus size={16} />
              </Button>
              <span className="text-base font-medium">{qty}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQty(qty + 1)}
              >
                <Plus size={16} />
              </Button>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <Button className="w-full">Add to Cart</Button>
              <Button variant="outline" className="w-full">
                Add to Compare
              </Button>
            </div>

            {categories?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map((cat: any) => (
                  <Badge key={cat.id} variant="outline" className="text-xs">
                    {cat.name}
                  </Badge>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      <Tabs defaultValue="desc" className="w-full mt-10">
        <TabsList>
          <TabsTrigger value="desc">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="desc">
          <div
            className="prose dark:prose-invert mt-4"
            dangerouslySetInnerHTML={{
              __html:
                description ||
                "<p class='text-muted-foreground'>No description available.</p>",
            }}
          />
        </TabsContent>
        <TabsContent value="reviews">
          <p className="text-muted-foreground text-sm mt-4">
            No reviews available.
          </p>
        </TabsContent>
      </Tabs>
    </Container>
  );
}
