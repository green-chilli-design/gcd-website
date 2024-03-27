import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ContentfulMedia from "@/lib/contentful-image";

export default function ParkingModal({
  url,
  description,
  width,
  height,
}: {
  url: string;
  description: string;
  width: number;
  height: number;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <p className="small mb-2.5 flex cursor-pointer items-center uppercase">
          <span className="material-symbols-outlined icon-24 mr-2">
            visibility
          </span>
          View Parking Instructions
        </p>
      </DialogTrigger>
      <DialogContent className="py-0 pt-6 lg:py-6">
        <div className="pt-14">
          <ContentfulMedia
            src={url}
            alt={description}
            imageProps={{
              width,
              height,
              quality: 100,
              className:
                "relative h-full w-full rounded-br-[100px] rounded-tl-[100px]",
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
