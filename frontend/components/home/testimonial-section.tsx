import { TestimonialCard } from "./testimonial-card";

export function TestimonialsSection() {
  const testimonials = {
    group_a: [
      {
        title: "Sunt qui esse pariatur duis deserunt mollit",
        content:
          "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.",
        author: "Cody Fisher",
        role: "Medical Assistant",
      },
      {
        title: "At lectus urna duis convallis tellus",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui accumsan sit amet nulla facilisi morbi.",
        author: "Jenny Wilson",
        role: "Nursing Assistant",
      },
    ],
    group_b: [
      {
        title: "Elit aute irure tempor cupidatat incididunt",
        content:
          "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.",
        content_sub:
          "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        author: "Guy Hawkins",
        role: "President of Sales",
      },
      {
        title: "Sunt qui esse pariatur duis deserunt mollit",
        content:
          "Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.",
        author: "Cody Fisher",
        role: "Medical Assistant",
      },
    ],
    group_c: [
      {
        title: "Donec et fringilla neque",
        content:
          "Etiam accumsan porta neque in viverra. Proin eleifend, eros in tristique hendrerit, nisi purus cursus sapien, id ultrices nunc tellus a ipsum. Donec et fringilla neque. Aenean consequat purus quis lectus maximus fermentum.",
        author: "Darlene Robertson",
        role: "Dog Trainer",
      },
      {
        title: "Etiam accumsan porta neque eros",
        content:
          "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.",
        author: "Dianne Russell",
        role: "Medical Assistant",
      },
    ],
  };

  return (
    <section className="py-24 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="mb-10">
        <p className="text-lg font-medium mb-2">Testimonials</p>
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
          People all over the <br /> world use banko.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col items-center gap-6">
          {testimonials.group_a.map((testimonial) => (
            <TestimonialCard key={testimonial.title} {...testimonial} />
          ))}
        </div>
        <div className="flex flex-col items-center gap-6">
          {testimonials.group_b.map((testimonial) => (
            <TestimonialCard key={testimonial.title} {...testimonial} />
          ))}
        </div>
        <div className="flex flex-col items-center gap-6">
          {testimonials.group_c.map((testimonial) => (
            <TestimonialCard key={testimonial.title} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
