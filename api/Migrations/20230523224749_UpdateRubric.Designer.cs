﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using rubrixapi.Data;

#nullable disable

namespace rubrixapi.Migrations
{
    [DbContext(typeof(RubrixDBContext))]
    [Migration("20230523224749_UpdateRubric")]
    partial class UpdateRubric
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.4");

            modelBuilder.Entity("rubrixapi.Models.Course", b =>
                {
                    b.Property<string>("CourseId")
                        .HasColumnType("TEXT");

                    b.Property<string>("CatalogNbr")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Subject")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("CourseId");

                    b.ToTable("Courses");
                });

            modelBuilder.Entity("rubrixapi.Models.Criteria", b =>
                {
                    b.Property<Guid>("CriteriaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("CriteriaDescription")
                        .HasColumnType("TEXT");

                    b.Property<int>("MaxGradeAttainable")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SampleFeedback")
                        .HasColumnType("TEXT");

                    b.HasKey("CriteriaId");

                    b.ToTable("Criteria");
                });

            modelBuilder.Entity("rubrixapi.Models.GradeBoundary", b =>
                {
                    b.Property<Guid>("GradeBoundaryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("CriteriaId")
                        .HasColumnType("TEXT");

                    b.Property<string>("GradeBoundaryDescription")
                        .HasColumnType("TEXT");

                    b.Property<int>("MaximumGradeAttainable")
                        .HasColumnType("INTEGER");

                    b.HasKey("GradeBoundaryId");

                    b.HasIndex("CriteriaId");

                    b.ToTable("GradeBoundaries");
                });

            modelBuilder.Entity("rubrixapi.Models.Requirement", b =>
                {
                    b.Property<int>("RequirementId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("RubricId")
                        .HasColumnType("TEXT");

                    b.HasKey("RequirementId");

                    b.HasIndex("RubricId");

                    b.ToTable("Requirements");
                });

            modelBuilder.Entity("rubrixapi.Models.Rubric", b =>
                {
                    b.Property<Guid>("RubricId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("CourseId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Creator")
                        .HasColumnType("TEXT");

                    b.Property<string>("NoteToMarkers")
                        .HasColumnType("TEXT");

                    b.Property<string>("RubricDescription")
                        .HasColumnType("TEXT");

                    b.Property<string>("RubricTitle")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("RubricId");

                    b.HasIndex("CourseId");

                    b.ToTable("Rubrics");
                });

            modelBuilder.Entity("rubrixapi.Models.RubricCriteria", b =>
                {
                    b.Property<Guid>("RubricId")
                        .HasColumnType("TEXT")
                        .HasColumnOrder(0);

                    b.Property<Guid>("CriterionId")
                        .HasColumnType("TEXT")
                        .HasColumnOrder(1);

                    b.HasKey("RubricId", "CriterionId");

                    b.HasIndex("CriterionId");

                    b.ToTable("RubricCriteria");
                });

            modelBuilder.Entity("rubrixapi.Models.RubricUser", b =>
                {
                    b.Property<Guid>("RubricId")
                        .HasColumnType("TEXT")
                        .HasColumnOrder(0);

                    b.Property<string>("Username")
                        .HasColumnType("TEXT")
                        .HasColumnOrder(1);

                    b.Property<string>("Role")
                        .HasColumnType("TEXT");

                    b.HasKey("RubricId", "Username");

                    b.HasIndex("Username");

                    b.ToTable("RubricUsers");
                });

            modelBuilder.Entity("rubrixapi.Models.User", b =>
                {
                    b.Property<string>("Username")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .HasColumnType("TEXT");

                    b.Property<string>("Password")
                        .HasColumnType("TEXT");

                    b.HasKey("Username");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("rubrixapi.Models.GradeBoundary", b =>
                {
                    b.HasOne("rubrixapi.Models.Criteria", "Criterion")
                        .WithMany()
                        .HasForeignKey("CriteriaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Criterion");
                });

            modelBuilder.Entity("rubrixapi.Models.Requirement", b =>
                {
                    b.HasOne("rubrixapi.Models.Rubric", "Rubric")
                        .WithMany("Requirements")
                        .HasForeignKey("RubricId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Rubric");
                });

            modelBuilder.Entity("rubrixapi.Models.Rubric", b =>
                {
                    b.HasOne("rubrixapi.Models.Course", "Course")
                        .WithMany()
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Course");
                });

            modelBuilder.Entity("rubrixapi.Models.RubricCriteria", b =>
                {
                    b.HasOne("rubrixapi.Models.Criteria", "Criterion")
                        .WithMany()
                        .HasForeignKey("CriterionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("rubrixapi.Models.Rubric", "Rubric")
                        .WithMany()
                        .HasForeignKey("RubricId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Criterion");

                    b.Navigation("Rubric");
                });

            modelBuilder.Entity("rubrixapi.Models.RubricUser", b =>
                {
                    b.HasOne("rubrixapi.Models.Rubric", "Rubric")
                        .WithMany("RubricUsers")
                        .HasForeignKey("RubricId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("rubrixapi.Models.User", "User")
                        .WithMany("RubricUsers")
                        .HasForeignKey("Username")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Rubric");

                    b.Navigation("User");
                });

            modelBuilder.Entity("rubrixapi.Models.Rubric", b =>
                {
                    b.Navigation("Requirements");

                    b.Navigation("RubricUsers");
                });

            modelBuilder.Entity("rubrixapi.Models.User", b =>
                {
                    b.Navigation("RubricUsers");
                });
#pragma warning restore 612, 618
        }
    }
}