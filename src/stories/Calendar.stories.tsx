import type { Meta, StoryObj } from "@storybook/react";
import dayjs from "dayjs";
import { Calendar1 } from "../component/Calendar1";

const meta = {
  title: "日历组件",
  component: Calendar1,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar1>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Value: Story = {
  args: {
    value: dayjs("2023-11-08"),
  },
};

export const DateRender: Story = {
  args: {
    value: dayjs("2023-11-08"),
    dateRender(currentDate) {
      return <div>日期{currentDate.date()}</div>;
    },
  },
};

export const DateInnerContent: Story = {
  args: {
    value: dayjs("2023-11-08"),
    dateInnerContent(currentDate) {
      return <div>日期{currentDate.date()}</div>;
    },
  },
};

export const Locale: Story = {
  args: {
    value: dayjs("2023-11-08"),
    locale: "en-US",
  },
};
