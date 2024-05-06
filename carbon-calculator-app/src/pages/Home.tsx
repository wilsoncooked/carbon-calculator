import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CREATE_CARBON_CALCULATION } from "@/graphql/mutations";
import { useNavigate } from "react-router-dom";

const ERROR_MESSAGES = {
  required: "This field cannot be empty",
};

enum CommuteModes {
  CAR = "Car",
  BUS = "Bus",
  TRAIN = "Train",
  BIKE = "Bike",
  WALK = "Walk",
}

const formSchema = z.object({
  numPeopleLiving: z.coerce.number().min(0, {
    message: ERROR_MESSAGES.required,
  }),
  electricityConsumption: z.coerce.number().min(0, {
    message: ERROR_MESSAGES.required,
  }),
  commuteDistance: z.coerce.number().min(0, {
    message: ERROR_MESSAGES.required,
  }),
  commuteWeeklyFrequency: z.coerce.number().min(0, {
    message: ERROR_MESSAGES.required,
  }),
  commuteMode: z.string().min(2, {
    message: ERROR_MESSAGES.required,
  }),
  flightsPerYear: z.coerce.number().min(0, {
    message: ERROR_MESSAGES.required,
  }),
  averageFlightDurationHours: z.coerce.number().min(0, {
    message: ERROR_MESSAGES.required,
  }),
});

type FieldValues = z.infer<typeof formSchema>;

export const Home = () => {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState<string>();
  const [createCarbonCalculation, { loading }] = useMutation(
    CREATE_CARBON_CALCULATION
  );

  useEffect(() => {
    const id = sessionStorage.getItem("sessionId");
    if (id) {
      setSessionId(id);
    }
  }, []);

  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numPeopleLiving: undefined,
      electricityConsumption: undefined,
      commuteDistance: undefined,
      commuteWeeklyFrequency: undefined,
      commuteMode: undefined,
      flightsPerYear: undefined,
      averageFlightDurationHours: undefined,
    },
  });

  const onSubmit = async (values: FieldValues) => {
    try {
      const result = await createCarbonCalculation({
        variables: {
          input: {
            sessionId: sessionId,
            numPeopleLiving: Number(values.numPeopleLiving),
            electricityConsumption: values.electricityConsumption,
            commuteDistance: values.commuteDistance,
            commuteWeeklyFrequency: values.commuteWeeklyFrequency,
            commuteMode: values.commuteMode,
            flightsPerYear: values.flightsPerYear,
            averageFlightDurationHours: values.averageFlightDurationHours,
          },
        },
      });
      if (result.data) {
        navigate("/results");
      }
    } catch (error) {
      console.error("Mutation error:", error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h3>Electricity Consumption</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="numPeopleLiving"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Number of people living in your household
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 6 }, (_, index) => (
                        <SelectItem key={index} value={String(index + 1)}>
                          {index + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="electricityConsumption"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Monthly Electricity Consumption</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>kWh</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h3>Commuting</h3>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="commuteMode"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Commute type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(CommuteModes).map((mode, index) => (
                        <SelectItem key={index} value={mode}>
                          {mode}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="commuteDistance"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Average daily distance</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>km</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="commuteWeeklyFrequency"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Days per week</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h3>Flights</h3>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="flightsPerYear"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Flights per year</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="averageFlightDurationHours"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Average flight duration</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>hours</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
