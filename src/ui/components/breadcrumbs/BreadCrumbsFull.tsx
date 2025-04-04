import BreadCrumbButton from "@/components/breadcrumbs/BreadCrumbButton"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useFolderNavStore } from "@/zustand/folderNavStore"


export default function() {

    const folders = useFolderNavStore(state => state.folders)

    return (
        <div className="flex items-center gap-2">
          <Breadcrumb>
            <BreadcrumbList>
              {folders.map(folder => {
                return (
                  <>
                    <BreadcrumbItem>
                      <BreadCrumbButton key={folder.id} name={folder.name} id={folder.id} />
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
    )
}