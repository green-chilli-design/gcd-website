import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ContentfulMedia from "@/lib/contentful-media";

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
        <p className="small mb-2.5 flex cursor-pointer items-center uppercase hover:text-green">
          <span className="material-icons-outlined icon-24 mr-2">
            visibility
          </span>
          View Parking Instructions
        </p>
      </DialogTrigger>
      <DialogContent className="h-full w-full py-0 pt-6 xl:w-4/5 xl:py-6">
        <div className="pt-14">
          <ContentfulMedia
            src={url}
            alt={description}
            imageProps={{
              width,
              height,
              quality: 100,
              className: "rounded-br-[30px] rounded-tl-[30px] object-cover",
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
